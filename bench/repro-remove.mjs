import { Window } from 'happy-dom'
const w = new Window({ url: 'http://localhost/' })
for(const k of ['window','document','Node','Element','HTMLElement','SVGElement','Text','Comment','customElements']) globalThis[k] = w[k]
const { Signal, each, tags } = await import('/home/ai-agent/work/ruri/src/index.ts')
const makeRows = () => Array.from({length:1000},(_,i)=>({id:i+1,label:'row '+(i+1)}))
const removed = (rows) => { const c = rows.slice(); c.splice(500,1); return c }
const items = new Signal(makeRows())
const container = document.createElement('div')
document.body.append(container)
container.append(tags.ul({}, each(items, r => tags.li({key:String(r.id)}, r.label), {key:r=>r.id})))

// standalone style: mutate the SAME item objects (no setup replacement)
items.value = removed(items.peek())
let t = process.hrtime.bigint()
items.value = removed(items.peek())
console.log('standalone-style remove:', Number(process.hrtime.bigint()-t)/1e6, 'ms')

// harness style: full replacement right before the timed mutation
for(let warm=0; warm<2; warm++) {
  items.value = makeRows()
  items.value = removed(items.peek())
}
const samples = []
for(let i=0;i<8;i++) {
  items.value = makeRows()
  const t0 = process.hrtime.bigint()
  items.value = removed(items.peek())
  samples.push(Number(process.hrtime.bigint()-t0)/1e6)
}
samples.sort((a,b)=>a-b)
console.log('harness-style remove median:', samples[Math.floor(samples.length/2)], 'ms | min:', samples[0])
