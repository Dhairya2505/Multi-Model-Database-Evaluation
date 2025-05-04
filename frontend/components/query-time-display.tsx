export function QueryTimeDisplay( {queryTimes, type} : {queryTimes: number, type: string}) {
    return (
        <div className="w-full pt-4 border-t space-y-4">
            <h3 className="text-sm font-medium">Query Performance Metrics</h3>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs">{type} Operation</span>
                    <span className="text-xs text-muted-foreground">{queryTimes} ms</span>
                </div>
            </div>
        </div>
    )
}  