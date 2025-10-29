import { SimpleLayout } from '@/src/shared/ui/simple-layout';
import { RegisterByEmailCard } from '@/src/features/register-by-email';

export function RegisterPage() {
    return (
        <SimpleLayout>
            <RegisterByEmailCard />
        </SimpleLayout>
    )
}