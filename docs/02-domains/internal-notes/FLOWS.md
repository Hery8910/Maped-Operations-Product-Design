# Internal Notes Flows

## Create

Open permitted Notes section → enter plain text → field validation → pending →
created note appears with author/timestamp. Validation stays local; recoverable
failure preserves draft and gives safe retry guidance.

## Edit

Select permitted note → edit plain text → pending → updated note/timestamp.
Concurrent change/conflict behavior remains a contract gate; it must never
silently discard another internal actor's update.

## Archive

Select permitted note → archive with proportionate explanation/confirmation
when policy warrants → pending → archived note no longer appears in normal list.
Retention/history and restore behavior are not assumed.
