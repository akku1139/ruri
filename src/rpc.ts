export const RPC_ENDPOINT = "/__rpc"

export interface RpcSuccess<T> {
  ok: true
  value: T
}

export interface RpcFailure {
  ok: false
  error: string
}

export type RpcResponse<T> = RpcSuccess<T> | RpcFailure

/**
 * Calls a server function registered with `app.rpc({ name })`.
 */
export const rpc = async <T = unknown>(name: string, ...args: ReadonlyArray<unknown>): Promise<T> => {
  const response = await fetch(`${RPC_ENDPOINT}/${encodeURIComponent(name)}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify([...args]),
  })

  const contentType = response.headers.get("content-type") ?? ""
  if(!contentType.includes("application/json")) {
    throw new Error(`rpc "${name}" failed: HTTP ${response.status}`)
  }

  const payload = await response.json() as RpcResponse<T>
  if(!payload.ok) {
    throw new Error(`rpc "${name}" failed: ${payload.error}`)
  }
  return payload.value
}
