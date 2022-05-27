# A controlled list with pagination

[← Documentation](../README.md#documentation)

Derive the visible slice from the requested page. Pagination uses one-based
pages and does not fetch data. This example keeps page state in the application,
clamps it when rows shrink, and names its progress indicator.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Card, EmptyState, Heading, Pagination, Progress, Stack, Text } from 'angin';

interface Task { id: string; title: string; completed: boolean; }
const pageSize = 5;

export function TaskDashboard({ tasks }: { tasks: readonly Task[] }) {
    const [requestedPage, setPage] = useState(1);
    const pageCount = Math.ceil(tasks.length / pageSize);
    const page = Math.max(1, Math.min(requestedPage, pageCount));
    const visible = tasks.slice((page - 1) * pageSize, page * pageSize);
    const completed = tasks.filter(task => task.completed).length;

    return (
        <section className="angin-root" aria-labelledby="tasks-heading">
            <Stack gap="lg">
                <Heading id="tasks-heading" level={1}>Tasks</Heading>
                <Progress label="Completed tasks" value={completed}
                          max={Math.max(tasks.length, 1)} showValue />
                {tasks.length === 0 ? (
                    <EmptyState title="No tasks yet" description="New tasks will appear here." />
                ) : (
                    <>
                        <ul>
                            {visible.map(task => (
                                <li key={task.id}>
                                    <Card>
                                        <Text>{task.title}</Text>
                                        <Text>{task.completed ? 'Completed' : 'In progress'}</Text>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                        <Pagination page={page} pageCount={pageCount} onChange={setPage}
                                    aria-label="Task pages" />
                    </>
                )}
            </Stack>
        </section>
    );
}
```

Import the CSS once at the root. For remote data, use `onChange` to update your
query state, show a loading indicator during the request, and provide the total
page count returned by the server. Keep the previous page visible until the next
result arrives if that suits the application's interaction model.

Use stable database IDs as keys. Do not infer task identity from its page position.
If multiple dashboards appear on one page, parameterize the heading ID. Progress
shows a percentage; the numeric maximum still represents the number of tasks.
