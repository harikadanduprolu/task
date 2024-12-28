import React from 'react';
import { Users, Calendar } from 'lucide-react';
import type { Team } from '../../types';
import { formatDate } from '../../lib/utils';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{team.name}</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">{team.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>{team.members.length} members</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Created {formatDate(team.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}