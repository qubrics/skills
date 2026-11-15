## MCP

Native task: `/root/php4_changed_workflows`  
Skill SHA256: `d8779e3c5e31d0b13a42b1f8b5ecacd7dd4f41f09cad4d9407a91d1a9fc000b4`  
Exact model, evaluation timing and token metadata unavailable.

MCP protocol revisions and package versions identify different things. The skill names protocol revisions **`2025-11-25` and `2026-07-28`**, a released **`sendmux-mcp` 2.1.3** historical catalogue, and an unpublished candidate declaring **2.2.0**. The candidate version declaration does not prove publication.

| Catalogue | Mailbox | Management | Sending | Total |
|---|---:|---:|---:|---:|
| Released 2.1.3 | 26 | 22 | 6 | 54 tools |
| Unpublished candidate, all names | 92 | 46 | 12 | 150 names |
| Candidate, unprefixed tools | 46 | 23 | 6 | 75 tools |

Each of the candidate’s 75 unprefixed tools has a `qubrics_` alias. Thus 150 names represent 75 tools with alternate names, not 150 distinct capabilities.

A catalogue describes the available tool inventory. Selected server surfaces and OAuth grants determine the subset a credential can see. A restricted discovery result must not be reported as the complete catalogue. Tool discovery alone also does not validate the upstream credential. Client configurations in the guide are documented examples, not certification that a particular client is compatible; that client needs separate verification.

The guide keeps **`https://mcp.sendmux.ai/mcp`** primary for hosted OAuth. The unpublished candidate declares **`https://mcp.qubrics.com/mcp`** its canonical resource and retains the legacy URL as an alias. This is candidate guidance, not evidence of a deployed or published canonical-host transition. Alias naming does not establish that tokens are interchangeable between resource identities.

For the guide’s legacy hosted flow, check these bindings separately and exactly:

1. The client authorisation request targets `https://mcp.sendmux.ai/mcp`.
2. The Sendmux authorisation server’s approved grant stores that exact resource restriction.
3. The issued token has that exact audience.

A resource-neutral dynamic client registration may validly omit `resource`; omission alone does not justify registering again. If the request fields are correct but `invalid_target` persists, investigate the authorisation server’s grant state. The client controls its requests and connection interface, but cannot edit Sendmux’s stored grant. An authorisation-stage error does not establish the resource server’s eventual rejection response.

Hosted MCP OAuth and REST OAuth use separate resources: do not reuse a REST access token as the hosted MCP bearer. For local/private HTTP, the bearer protecting the MCP endpoint is also separate from the Sendmux API key used upstream. If selecting the candidate canonical resource, preserve consistent resource/audience binding rather than assuming the legacy token applies.

No skill commands executed, credentials accessed, live state checked or publication certified. Candidate availability and client compatibility remain unverified.
