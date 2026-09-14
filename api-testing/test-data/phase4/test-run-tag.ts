/**
 * HELIX Phase 4 - Test Run Tag Utility
 *
 * Generates a unique identifier for each test execution.
 * The tag can be attached to test data so that records
 * created during a specific run can be identified and
 * cleaned up safely.
 */

export function generateTestRunTag(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `HELIX-${year}${month}${day}-${hours}${minutes}`;
}