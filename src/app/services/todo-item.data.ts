export interface TodoItem {
    readonly label: string;      // Label of the todo item
    readonly completed: boolean; // true if the todo item is completed
    readonly color: string;      // Hex color code, e.g., "#FF5733"
}