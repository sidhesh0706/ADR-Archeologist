# ADR-006: Use try-catch blocks for error handling

Date: ~2020
Status: Accepted
Category: error_handling
Confidence: 85%

## Context

The need for a robust and reliable error handling mechanism to ensure system stability. The use of try-catch blocks in lib/api.ts indicates the use of try-catch blocks for error handling.

## Decision

Try-catch blocks were chosen as the error handling mechanism due to their simplicity and effectiveness.

## Consequences

### Positive

- Simplicity
- Effectiveness

### Negative

- Limited error information

## Alternatives Considered

- **Error callbacks**: Not chosen due to increased complexity

## Evidence trail

- `lib/api.ts`
