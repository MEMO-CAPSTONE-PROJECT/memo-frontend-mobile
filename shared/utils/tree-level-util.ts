export const NEED_POINT = [100, 500, 1000, 1500, 2000];
export const TREE_MAX_LEVEL = 5;
export const SPENDING_AMOUNT = 100

export function getTreeLevel(spendingPoint: number) {
    let totalPoints = 0;
    for (let level = 0; level < NEED_POINT.length; level++) {
        totalPoints += NEED_POINT[level];
        if (spendingPoint < totalPoints) return level;
    }
    return NEED_POINT.length;
}

export function calculateSpendingPoint(spendingPoint: number) {
    const level = getTreeLevel(spendingPoint);
    const totalPointsNeeded = NEED_POINT.slice(0, level).reduce((sum, val) => sum + val, 0);
    const maxPoint = NEED_POINT[level] || null;
    
    return {
        level: level >= NEED_POINT.length ? TREE_MAX_LEVEL : level,
        needPointToNextLevel: spendingPoint - totalPointsNeeded,
        maxPoint,
    };
}

export function isLevelReached(spendingPoint: number) {
    const level = getTreeLevel(spendingPoint);
    const nextLevel = level + 1;
    
    if (nextLevel < NEED_POINT.length) {
        const requiredPoints = NEED_POINT.slice(0, nextLevel).reduce((sum, val) => sum + val, 0);
        return Math.abs(spendingPoint - requiredPoints) === 100;
    }
    return false;
}
