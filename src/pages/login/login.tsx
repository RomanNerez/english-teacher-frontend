import { SimpleLayout } from '@/src/shared/ui/simple-layout';
import { AuthByEmailCard } from '@/src/features/auth-by-email';

export function LoginPage() {
    return (
        <SimpleLayout>
            <AuthByEmailCard />
        </SimpleLayout>
    )
}