# ADR-002: Use monolithic architecture

Date: ~2019
Status: Accepted
Category: structure
Confidence: 80%

## Context

The need for a simple and maintainable architecture to reduce development complexity. The presence of a single pipeline file in src/lib/pipeline.ts indicates a monolithic architecture.

## Decision

A monolithic architecture was chosen due to its simplicity and ease of maintenance.

## Consequences

### Positive

- Simplicity
- Easy maintenance

### Negative

- Limited scalability

## Alternatives Considered

- **Microservices**: Not chosen due to increased complexity

## Evidence trail

- `src/lib/pipeline.ts`
