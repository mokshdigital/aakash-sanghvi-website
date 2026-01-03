
import Link from 'next/link';
import { Heading, Text, Button } from '@/components/ui/Primitives';

export default function DesignSystemIndex() {
    return (
        <div className="min-h-screen p-12 lg:p-24 flex flex-col items-center justify-center space-y-8 bg-zinc-50 text-zinc-900">
            <Heading level={1}>Design System Isolation</Heading>
            <Text>Select a theme to view in isolation:</Text>

            <div className="flex gap-4">
                <Link href="/design-system/light">
                    <Button variant="outline">View Light Theme</Button>
                </Link>
                <Link href="/design-system/dark">
                    <Button variant="primary" className="bg-black text-white hover:bg-zinc-800">View Dark Theme</Button>
                </Link>
            </div>
        </div>
    );
}
