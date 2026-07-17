export type NavigationItem = {
  id: string;
  label: string;
  href: string | null;
  enabled: boolean;
};

export type NavigationGroup = {
  id: string;
  label: string;
  items: NavigationItem[];
};

export const overviewItem: NavigationItem = {
  id: 'overview',
  label: 'Overview',
  href: null,
  enabled: false
};

export const navigationGroups: NavigationGroup[] = [
  {
    id: 'operations',
    label: 'Operations',
    items: [
      { id: 'service-requests', label: 'Service requests', href: null, enabled: false },
      { id: 'schedule', label: 'Schedule', href: null, enabled: false },
      { id: 'properties', label: 'Properties', href: null, enabled: false },
      { id: 'work-orders', label: 'Work orders', href: null, enabled: false }
    ]
  },
  {
    id: 'people',
    label: 'People',
    items: [
      { id: 'users', label: 'Users', href: '/users', enabled: true },
      { id: 'team', label: 'Team', href: null, enabled: false }
    ]
  },
  {
    id: 'catalog',
    label: 'Catalog',
    items: [
      { id: 'services', label: 'Services', href: null, enabled: false },
      { id: 'tasks', label: 'Tasks', href: null, enabled: false },
      { id: 'templates', label: 'Templates', href: null, enabled: false },
      { id: 'automations', label: 'Automations', href: null, enabled: false }
    ]
  },
  {
    id: 'communication',
    label: 'Communication',
    items: [
      { id: 'messages', label: 'Messages', href: null, enabled: false },
      { id: 'notifications', label: 'Notifications', href: null, enabled: false },
      { id: 'activity', label: 'Activity', href: null, enabled: false }
    ]
  },
  {
    id: 'company',
    label: 'Company',
    items: [
      { id: 'general', label: 'General', href: null, enabled: false },
      { id: 'branding', label: 'Branding', href: null, enabled: false },
      { id: 'contact-legal', label: 'Contact & legal', href: null, enabled: false },
      { id: 'operational-settings', label: 'Operational settings', href: null, enabled: false },
      { id: 'integrations', label: 'Integrations', href: null, enabled: false },
      { id: 'billing', label: 'Billing', href: null, enabled: false },
      { id: 'security', label: 'Security', href: null, enabled: false }
    ]
  }
];
