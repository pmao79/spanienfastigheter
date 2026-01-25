export type UserRole =
    | "owner"
    | "equity_partner"
    | "admin"
    | "sales_partner"
    | "agent"
    | "referral"
    | "customer";

export const ROLE_HIERARCHY: Record<UserRole, number> = {
    owner: 100,
    equity_partner: 90,
    admin: 80,
    sales_partner: 50,
    agent: 40,
    referral: 20,
    customer: 10,
};

export function canAccess(userRole: string | undefined | null, requiredRole: UserRole): boolean {
    if (!userRole) return false;
    // Type assertion since string comes from DB
    const role = userRole as UserRole;
    return (ROLE_HIERARCHY[role] || 0) >= ROLE_HIERARCHY[requiredRole];
}
