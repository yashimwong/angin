import React, { useState } from 'react';
import { Button, Modal, Drawer, Toast, Input } from '../../src';
export function ModalDemo() {
    const [open, setOpen] = useState(false);
    return <><Button onClick={() => setOpen(true)}>Open dialog</Button><Modal id="docs-modal" title="Create a project" open={open} onClose={() => setOpen(false)} footer={<Button onClick={() => setOpen(false)}>Done</Button>}><Input id="docs-modal-name" label="Project name" placeholder="My next idea" /></Modal></>;
}
export function DrawerDemo() {
    const [open, setOpen] = useState(false);
    return <><Button variant="outline" onClick={() => setOpen(true)}>Open settings</Button><Drawer id="docs-drawer" title="Workspace settings" open={open} onClose={() => setOpen(false)} footer={<Button onClick={() => setOpen(false)}>Save settings</Button>}><Input id="docs-drawer-name" label="Workspace name" defaultValue="My workspace" /></Drawer></>;
}
export function ToastDemo() { const [open, setOpen] = useState(true); return <div className="demo-column"><Button variant="outline" onClick={() => setOpen(true)}>Show notification</Button><Toast title="Changes saved" tone="success" open={open} onClose={() => setOpen(false)}>Your workspace is up to date.</Toast></div>; }
