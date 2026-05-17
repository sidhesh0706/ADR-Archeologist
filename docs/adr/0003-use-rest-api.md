# ADR-003: Use REST API

Date: ~2020
Status: Accepted
Category: communication
Confidence: 90%

## Context

The need for a standardized and widely-supported API protocol for communication between services. The use of fetch API calls in lib/api.ts indicates the use of REST API.

## Decision

REST API was chosen due to its standardization and wide adoption.

## Consequences

### Positive

- Standardization
- Wide adoption

### Negative

- Limited flexibility

## Alternatives Considered

- **GraphQL**: Not chosen due to increased complexity

## Evidence trail

- `lib/api.ts`
