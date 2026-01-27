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

    // Strict check if role exists in hierarchy
    const userLevel = ROLE_HIERARCHY[userRole as UserRole];
    const requiredLevel = ROLE_HIERARCHY[requiredRole];

    if (userLevel === undefined) return false;

    return userLevel >= requiredLevel;
}

// Helper to get readable label for role
export function getRoleLabel(role: string): string {
    switch (role) {
        case "owner": return "Owner";
        case "equity_partner": return "Equity Partner";
        case "admin": return "Admin";
        case "sales_partner": return "Sales Partner";
        case "agent": return "Agent";
        case "referral": return "Referral";
        case "customer": return "Customer";
        default: return role;
    }
}
