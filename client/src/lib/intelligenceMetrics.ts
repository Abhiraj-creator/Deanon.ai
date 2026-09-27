import {
  mockActors,
  mockEvidence,
  mockSources,
} from '../mocks/data';

export function getIntelligenceMetrics() {
  const actors = Object.keys(mockActors);
  const actorCount = actors.length;

  let identifierCount = 0;
  let infrastructureCount = 0;
  let relationshipCount = 0;

  for (const id of actors) {
    const a = mockActors[id as keyof typeof mockActors];
    identifierCount += a.identifiers.length;
    infrastructureCount += a.infrastructure.length;
    relationshipCount += a.relationships.length;
  }

  const evidenceCount = mockEvidence.length;
  const sourceCount = mockSources.length;
  const sourcesOnline = mockSources.filter((s) => s.status === 'Online').length;
  const highConfidenceEvidence = mockEvidence.filter((e) => e.confidence === 'High').length;
  const uniqueEvidenceActors = new Set(mockEvidence.map((e) => e.actor)).size;

  return {
    actorCount,
    identifierCount,
    infrastructureCount,
    relationshipCount,
    evidenceCount,
    sourceCount,
    sourcesOnline,
    highConfidenceEvidence,
    uniqueEvidenceActors,
  };
}
