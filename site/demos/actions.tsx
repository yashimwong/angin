import React, { useState } from 'react';
import { Button, IconButton, Link, Tooltip } from '../../src';
export function ButtonDemo() {
    const [saved, setSaved] = useState(false);
    return <div><div className="demo-row"><Button onClick={() => setSaved(true)}>Save changes</Button><Button variant="outline" onClick={() => setSaved(false)}>Reset</Button><Button variant="ghost" disabled>Unavailable</Button></div><p className="demo-state" role="status">{saved ? 'Changes saved in this preview.' : 'Try the primary and outline variants.'}</p></div>;
}
export function IconButtonDemo() {
    const [saved, setSaved] = useState(false);
    return <div className="demo-row"><IconButton icon={<span aria-hidden="true">{saved ? '★' : '☆'}</span>} label={saved ? 'Remove bookmark' : 'Bookmark this page'} aria-pressed={saved} onClick={() => setSaved(!saved)} /><span className="demo-state" role="status">{saved ? 'Bookmarked' : 'Not bookmarked'}</span></div>;
}
export function LinkDemo() { return <div><Link href="#demo-link-destination">Jump to the destination</Link><p id="demo-link-destination" className="demo-state">This is a real anchor destination.</p></div>; }
export function TooltipDemo() { return <Tooltip id="docs-tooltip-example" content="Your changes are saved to this preview only."><button type="button">Hover or focus for help</button></Tooltip>; }
