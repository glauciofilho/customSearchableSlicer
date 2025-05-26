import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
export declare class Visual implements IVisual {
    private root;
    private searchBox;
    private itemsContainer;
    private selectionManager;
    private items;
    constructor(options: VisualConstructorOptions);
    update(options: powerbi.extensibility.visual.VisualUpdateOptions): void;
    private renderItems;
    private toggleSelection;
    private filterItems;
}
