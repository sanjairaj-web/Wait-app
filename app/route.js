import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// NOTE: This uses a local JSON file for simplicity — great for a demo,
// but on Vercel's production servers the filesystem is temporary/read-only.
// For a real launch, swap this for a database (see README "Going to production").
const DATA_FILE = path.join('/tmp', 'waitlist.json');

function readEmails() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeEmails(emails) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(emails, null, 2));
}

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email' }, { status: 400 });
  }

  const emails = readEmails();

  if (emails.includes(email)) {
    return NextResponse.json({ error: 'You are already on the list!' }, { status: 409 });
  }

  emails.push(email);
  writeEmails(emails);

  return NextResponse.json({ success: true, total: emails.length });
}

export async function GET() {
  const emails = readEmails();
  return NextResponse.json({ total: emails.length });
}
