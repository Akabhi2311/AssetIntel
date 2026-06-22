'use client';

import React, { useEffect, useState } from 'react';

interface Node {
  id: string;
  label: string;
  type: 'root' | 'document' | 'equipment' | 'regulatory' | 'zone';
}

interface Link {
  source: string;
  target: string;
  relation: string;
}

export default function KnowledgeGraphPreview() {
  const [graphData, setGraphData] = useState<{ nodes: Node[]; links: Link[] }>({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Calls the updated analytics endpoints seamlessly
    fetch('http://localhost:8000/analytics/knowledge-graph', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGraphData(data || { nodes: [], links: [] });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading knowledge graph pipeline:", err);
        setLoading(false);
      });
  }, []);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'root': return '#ea580c';        // Safety Orange Hub
      case 'document': return '#38bdf8';    // Document Cyan
      case 'equipment': return '#eab308';   // Hardware Amber
      case 'regulatory': return '#ef4444';  // Regulatory Compliance Red
      default: return '#10b981';            // Facility Zone Green
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border p-6 h-[400px] flex items-center justify-center"
           style={{ background: '#04113a', borderColor: 'rgba(255,255,255,0.08)' }}>
        <p className="text-gray-400 text-lg animate-pulse font-medium">
          Computing topological asset linkages...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border p-6 h-[420px] flex flex-col justify-between"
         style={{ background: '#04113a', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">Entity Dependency Architecture</h3>
        <p className="text-sm text-gray-400">Live cross-link metrics across ingested document records</p>
      </div>

      {/* NODE RELATION MAPPING MATRIX */}
      <div className="flex-1 relative mt-4 border rounded-2xl overflow-hidden bg-[#030712]/60"
           style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        {graphData.nodes.length <= 1 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm italic">
            Ingest industrial documentation to populate structural relation pathways.
          </div>
        ) : (
          <div className="absolute inset-0 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
            {graphData.nodes.filter(n => n.type !== 'root').map((node) => {
              // Calculate pathway density dynamically based on link structures
              const pathwaysMapped = graphData.links.filter(
                l => l.target === node.id || l.source === node.id
              ).length;
              
              return (
                <div 
                  key={node.id} 
                  className="flex flex-col p-3 rounded-xl border bg-[#09112e] transition-all duration-200 hover:scale-[1.01]"
                  style={{ borderColor: `${getNodeColor(node.type)}25` }}
                >
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm animate-pulse" 
                      style={{ backgroundColor: getNodeColor(node.type) }}
                    />
                    <span className="text-sm font-semibold text-slate-200 truncate max-w-full">
                      {node.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500 mt-2 font-mono tracking-wider">
                    ⚡ {pathwaysMapped} pipeline path{pathwaysMapped !== 1 ? 's' : ''} mapped
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* GRAPH LEGEND */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs mt-4 pt-3 border-t border-white/5 text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ea580c' }} /> Platform Core
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#38bdf8' }} /> Technical Logs
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#eab308' }} /> Equipment Tags
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ef4444' }} /> Regulatory Norms
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#10b981' }} /> Facility Zones
        </div>
      </div>
    </div>
  );
}