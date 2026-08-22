### SSR: 1,000-row table (html string)

| framework | median (ms) | min | relative |
|---|---:|---:|---:|
| vanilla template literal | 0.165 | 0.15 | 1.00x |
| preact (renderToString) | 1.843 | 1.138 | 11.17x |
| vue (server-renderer) | 3.42 | 2.38 | 20.73x |
| ruri | 8.153 | 4.591 | 49.41x |
| react (renderToStaticMarkup) | 26.09 | 19.304 | 158.12x |

### CSR: mount 1,000-row list

| framework | median (ms) | min | relative |
|---|---:|---:|---:|
| react | 13.537 | 5.284 | 1.00x |
| vanilla (happy-dom) | 14.547 | 10.369 | 1.07x |
| vue | 26.623 | 16.691 | 1.97x |
| preact | 35.458 | 17.329 | 2.62x |
| ruri | 48.059 | 20.429 | 3.55x |

### CSR: 1000 counter updates

| framework | median (ms) | min | relative |
|---|---:|---:|---:|
| ruri | 0.854 | 0.678 | 1.00x |
| vanilla (happy-dom) | 5.959 | 4.631 | 6.98x |
| @preact/signals-core | 18.91 | 4.706 | 22.14x |
| react (flushSync) | 94.596 | 78.734 | 110.77x |

### Signals: 10000 writes with one subscriber

| framework | median (ms) | min | relative |
|---|---:|---:|---:|
| @preact/signals-core | 1.755 | 0.773 | 1.00x |
| ruri | 4.483 | 3.56 | 2.55x |

### Signals: 10-step derived chain, 100 writes

| framework | median (ms) | min | relative |
|---|---:|---:|---:|
| @preact/signals-core | 0.247 | 0.212 | 1.00x |
| ruri | 0.677 | 0.397 | 2.74x |

