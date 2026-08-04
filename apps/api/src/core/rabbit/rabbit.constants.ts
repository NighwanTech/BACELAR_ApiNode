export const RABBITMQ_CLIENT = 'RABBITMQ_CLIENT';
export const RABBITMQ_EXCHANGE = 'universityos.events';

export const RabbitQueues = {
  NOTIFICATIONS: 'notifications',
  AUDIT: 'audit',
  DOCUMENTS: 'documents',
  SEARCH: 'search',
  EMAILS: 'emails',
  SMS: 'sms',
  PUSH: 'push',
  WORKFLOW: 'workflow',
  REPORTING: 'reporting',
} as const;

export const RabbitRoutingKeys = {
  NOTIFICATION_CREATED: 'notification.created',
  AUDIT_CREATED: 'audit.created',
  DOCUMENT_PROCESSED: 'document.processed',
  SEARCH_INDEX: 'search.index',
  EMAIL_SEND: 'email.send',
  SMS_SEND: 'sms.send',
  PUSH_SEND: 'push.send',
  WORKFLOW_STARTED: 'workflow.started',
  REPORT_GENERATED: 'report.generated',
} as const;
