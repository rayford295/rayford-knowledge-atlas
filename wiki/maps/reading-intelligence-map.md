# Reading Intelligence Map

This map records how the `huashu-weread-advisor` method turns WeRead metadata into public-safe atlas decisions.

## Method

```text
Shelf intention + notebook evidence + recent activity -> workflow queue
```

The live public data file is [`raw/weread/reading-intelligence.json`](../../raw/weread/reading-intelligence.json). It does not store raw highlights, private notes, comments, or long excerpts.

## Lenses

- Deep reads: note-heavy books that deserve alchemy into synthesis notes.
- Recent signals: books that reveal the live edge of attention.
- Hidden deep reads: notebook-heavy books that are not visible in the current shelf view.
- Shelf gaps: books kept on the shelf without public note evidence yet.

## Workflow Queue

- `alchemy`: turn a deep book into a durable note.
- `path`: turn a theme into a learning path.
- `review`: turn a reading period into a public-safe review.
- `advisor`: decide what to read or promote next.

## Atlas Links

- Public page: [Reading Advisor](../../advisor.html)
- Reading inputs: [[reading-input-map]]
- Bridge questions: [[question-map]]
- Research outputs: [[research-output-map]]
