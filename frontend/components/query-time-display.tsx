export function QueryTimeDisplay( {pgqueryTimes, mongoQueryTimes, type} : {pgqueryTimes: number, mongoQueryTimes: number, type: string}) {
    return (
        <div className="w-full pt-4 border-t space-y-4">
            <h3 className="text-sm font-medium">Query Performance Metrics</h3>

            <div className="space-y-2">
                <div className="flex justify-between items-start">
                    <span className="text-xs">{type} Operation</span>
                    <div>
                        <div className="text-xs text-muted-foreground">PostgreSQL - {pgqueryTimes} ms</div>
                        <div className="text-xs text-muted-foreground">MongoDB - {mongoQueryTimes} ms</div>
                    </div>
                </div>
            </div>
        </div>
    )
}  