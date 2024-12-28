import React from 'react';
import { User } from 'lucide-react';
import type { TeamMember } from '../../types';

interface TeamMemberListProps {
  members: TeamMember[];
}

export function TeamMemberList({ members }: TeamMemberListProps) {
  return (
    <div className="flow-root mt-6">
      <ul role="list" className="-my-5 divide-y divide-gray-200">
        {members.map((member) => (
          <li key={member.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {member.user?.avatar_url ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={member.user.avatar_url}
                    alt={member.user.full_name}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {member.user?.full_name}
                </p>
                <p className="text-sm text-gray-500 truncate capitalize">
                  {member.role}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}