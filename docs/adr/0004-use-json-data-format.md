# ADR-004: Use JSON data format

Date: ~2020
Status: Accepted
Category: data
Confidence: 85%

## Context

The need for a lightweight and flexible data format to reduce storage and transmission overhead. The presence of JSON data format in the Groq client in src/lib/groq.ts indicates the use of JSON data format.

## Decision

JSON was chosen as the data format due to its lightweight and flexible nature.

## Consequences

### Positive

- Lightweight
- Flexible

### Negative

- Limited data typing

## Alternatives Considered

- **XML**: Not chosen due to increased verbosity

## Evidence trail

- `src/lib/groq.ts`
