import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TeamBuilderPanel from '../components/TeamBuilderPanel';

export default function TeamBuilder() {
  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', color: '#F5F5F0', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(82,183,136,0.1)' }}>
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#F5F5F0' }}>
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </header>
      <main style={{ flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '24px 20px' }}>
        <TeamBuilderPanel />
      </main>
    </div>
  );
}
