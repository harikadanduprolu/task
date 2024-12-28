import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { TeamCard } from '../components/teams/TeamCard';
import { TeamStats } from '../components/teams/TeamStats';
import { TeamForm } from '../components/teams/TeamForm';
import { useTeamStore } from '../store/teamStore';

export function Teams() {
  const [showNewTeamForm, setShowNewTeamForm] = useState(false);
  const teams = useTeamStore((state) => state.teams);

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Teams</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your teams and collaborate with members
            </p>
          </div>
          <button
            onClick={() => setShowNewTeamForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            New Team
          </button>
        </div>
      </div>

      <TeamStats />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>

      {showNewTeamForm && <TeamForm onClose={() => setShowNewTeamForm(false)} />}
    </div>
  );
}