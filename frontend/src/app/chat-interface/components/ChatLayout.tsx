'use client';

import React from 'react';

import ConversationSidebar from './ConversationSidebar';
import ChatArea from './ChatArea';

export default function ChatLayout() {

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{
        backgroundColor: 'hsl(var(--background))',
      }}
    >

      {/* SIDEBAR */}
      <ConversationSidebar />

      {/* CHAT */}
      <ChatArea
        conversationId="main-chat"
      />

    </div>
  );
}