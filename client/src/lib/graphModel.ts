import type { LucideIcon } from 'lucide-react';
import {
  ShieldAlert,
  Key,
  Server,
  Database,
  Users,
} from 'lucide-react';
import type { ActorId } from '../mocks/data';

export type GraphNodeType = 'actor' | 'identifier' | 'infra' | 'source';

export type GraphNode = {
  id: string;
  label: string;
  type: GraphNodeType;
  x: string;
  y: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  data: Record<string, string>;
  actorKey?: ActorId;
};

export type GraphEdge = {
  from: string;
  to: string;
  label: string;
  confidence: 'High' | 'Moderate';
};

export const GRAPH_NODES: Record<string, GraphNode> = {
  darkvendorx: {
    id: 'darkvendorx',
    label: 'DarkVendorX',
    type: 'actor',
    x: '50%',
    y: '50%',
    icon: ShieldAlert,
    color: 'text-status-red',
    bg: 'bg-status-red/10',
    border: 'border-status-red/50',
    data: { Role: 'Initial Access Broker', 'First Seen': '2022-03-14' },
    actorKey: 'DarkVendorX',
  },
  onion_node: {
    id: 'onion_node',
    label: 'darkvx...onion',
    type: 'infra',
    x: '35%',
    y: '25%',
    icon: Server,
    color: 'text-status-purple',
    bg: 'bg-status-purple/10',
    border: 'border-status-purple/50',
    data: { Type: 'Tor Hidden Service', Status: 'Offline' },
  },
  wallet_node: {
    id: 'wallet_node',
    label: 'bc1qn...k9',
    type: 'identifier',
    x: '65%',
    y: '20%',
    icon: Key,
    color: 'text-status-blue',
    bg: 'bg-status-blue/10',
    border: 'border-status-blue/50',
    data: { Type: 'Bitcoin Address', Balance: '12.4 BTC' },
  },
  actor_2: {
    id: 'actor_2',
    label: 'SilentCrow',
    type: 'actor',
    x: '80%',
    y: '50%',
    icon: Users,
    color: 'text-status-red',
    bg: 'bg-status-red/10',
    border: 'border-status-red/50',
    data: { Role: 'Forum Member', 'First Seen': '2026-09-21' },
    actorKey: 'SilentCrow',
  },
  pgp_node: {
    id: 'pgp_node',
    label: '0xA3F9D2C',
    type: 'identifier',
    x: '70%',
    y: '75%',
    icon: Key,
    color: 'text-status-blue',
    bg: 'bg-status-blue/10',
    border: 'border-status-blue/50',
    data: { Type: 'PGP Public Key', Email: 'dvx@secmail.pro' },
  },
  source_1: {
    id: 'source_1',
    label: 'XMarket',
    type: 'source',
    x: '50%',
    y: '85%',
    icon: Database,
    color: 'text-accent-solid',
    bg: 'bg-accent-soft',
    border: 'border-accent-border',
    data: { Type: 'Marketplace', Status: 'Active' },
  },
  source_2: {
    id: 'source_2',
    label: 'DarkForum',
    type: 'source',
    x: '30%',
    y: '75%',
    icon: Database,
    color: 'text-accent-solid',
    bg: 'bg-accent-soft',
    border: 'border-accent-border',
    data: { Type: 'Forum', Status: 'Active' },
  },
  actor_3: {
    id: 'actor_3',
    label: 'AlphaBay_Seller',
    type: 'actor',
    x: '20%',
    y: '50%',
    icon: Users,
    color: 'text-status-red',
    bg: 'bg-status-red/10',
    border: 'border-status-red/50',
    data: { Role: 'Marketplace Vendor', Status: 'Retired' },
    actorKey: 'AlphaBay_Seller',
  },
};

export const GRAPH_EDGES: GraphEdge[] = [
  { from: 'darkvendorx', to: 'onion_node', label: 'operates', confidence: 'High' },
  { from: 'darkvendorx', to: 'wallet_node', label: 'wallet used', confidence: 'High' },
  { from: 'darkvendorx', to: 'actor_2', label: 'PGP reuse', confidence: 'High' },
  { from: 'darkvendorx', to: 'pgp_node', label: 'signed with', confidence: 'High' },
  { from: 'darkvendorx', to: 'source_1', label: 'observed on', confidence: 'High' },
  { from: 'darkvendorx', to: 'source_2', label: 'observed on', confidence: 'Moderate' },
  { from: 'darkvendorx', to: 'actor_3', label: 'stylometric match', confidence: 'Moderate' },
  { from: 'actor_2', to: 'pgp_node', label: 'same key', confidence: 'High' },
  { from: 'actor_3', to: 'source_1', label: 'observed on', confidence: 'High' },
  { from: 'onion_node', to: 'source_2', label: 'scraped by', confidence: 'Moderate' },
  { from: 'pgp_node', to: 'source_2', label: 'found on', confidence: 'High' },
  { from: 'wallet_node', to: 'source_1', label: 'traced on', confidence: 'Moderate' },
];

export const NODE_EVIDENCE: Record<string, { id: string; desc: string; date: string }[]> = {
  darkvendorx: [
    { id: 'EV-8921', desc: 'SSL Certificate reuse', date: '2026-09-24' },
    { id: 'EV-4412', desc: 'Forum post text sample', date: '2026-09-20' },
  ],
  actor_2: [{ id: 'EV-6001', desc: 'PGP key 0xA3F9D2C on SilentCrow', date: '2026-09-23' }],
  pgp_node: [
    { id: 'EV-3021', desc: 'PGP Public Key Block', date: '2025-11-05' },
    { id: 'EV-6001', desc: 'Key reuse across 2 actors', date: '2026-09-23' },
  ],
  wallet_node: [{ id: 'EV-4000', desc: 'BTC transaction trace', date: '2026-09-18' }],
  onion_node: [{ id: 'EV-8921', desc: 'SSL cert → 198.51.100.23', date: '2026-09-24' }],
};

export type GraphNodeId = keyof typeof GRAPH_NODES;
