import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView; // <-- Adição do Passo 5
import ISelectionManager = powerbi.extensibility.ISelectionManager; // <-- Adição do Passo 5

export class Visual implements IVisual {
  private root: HTMLElement;
  private searchBox: HTMLInputElement;
  private itemsContainer: HTMLElement;
  private selectionManager: ISelectionManager; // <-- Adição do Passo 5
  private items: { name: string; selected: boolean }[] = []; // <-- Adição do Passo 5

  constructor(options: VisualConstructorOptions) {
    this.root = document.createElement("div");
    this.root.classList.add("custom-slicer");
    options.element.appendChild(this.root);

    // Barra de busca
    this.searchBox = document.createElement("input");
    this.searchBox.type = "text";
    this.searchBox.placeholder = "Pesquisar...";
    this.searchBox.classList.add("search-box");
    this.root.appendChild(this.searchBox);

    // Container para os itens
    this.itemsContainer = document.createElement("div");
    this.itemsContainer.classList.add("items-container");
    this.root.appendChild(this.itemsContainer);

    // Inicializa o selectionManager (Adição do Passo 5)
    this.selectionManager = options.host.createSelectionManager();

    // Evento de busca
    this.searchBox.addEventListener("input", () => this.filterItems());
  }

  // Método update() do Passo 5 (substitui o método vazio original)
  public update(options: powerbi.extensibility.visual.VisualUpdateOptions) {
    const dataView: DataView = options.dataViews[0];
    if (!dataView?.table?.rows) return;

    this.items = dataView.table.rows.map(row => ({
      name: row[0].toString(),
      selected: false
    }));

    this.renderItems();
  }

  // Métodos novos do Passo 5 (adicionados após o update())
  private renderItems(): void {
    this.itemsContainer.innerHTML = "";
    this.items.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("slicer-item");
      if (item.selected) itemElement.classList.add("selected");
      itemElement.textContent = item.name;

      itemElement.addEventListener("click", () => {
        this.toggleSelection(index);
      });

      this.itemsContainer.appendChild(itemElement);
    });
  }

  private toggleSelection(index: number): void {
    this.items[index].selected = !this.items[index].selected;
    this.selectionManager.select({
      data: [{
        data: [this.items[index].name]
      }]
    }, this.items[index].selected);
    this.renderItems();
  }

  private filterItems(): void {
    const searchTerm = this.searchBox.value.toLowerCase();
    const filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );

    // Renderiza os itens filtrados (implementação simplificada)
    this.itemsContainer.innerHTML = "";
    filteredItems.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.textContent = item.name;
      this.itemsContainer.appendChild(itemElement);
    });
  }
}