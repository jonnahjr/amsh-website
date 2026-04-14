/**
 * Export Utility for AMSH Administrative Intelligence
 */

export const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
        alert("No data available for export.");
        return;
    }

    // Capture all headers (keys) from the first object
    const headers = Object.keys(data[0]);
    
    // Construct the CSV content
    const csvContent = [
        headers.join(','), // Header row
        ...data.map(row => 
            headers.map(fieldName => {
                const value = row[fieldName];
                // Sanitize: Wrap strings in quotes and handle commas/nulls
                if (value === null || value === undefined) return '""';
                if (typeof value === 'object') return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
                const stringValue = String(value).replace(/"/g, '""');
                return `"${stringValue}"`;
            }).join(',')
        )
    ].join('\r\n');

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
