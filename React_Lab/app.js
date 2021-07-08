const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({ filterText });
  }

  handleInStockChange(inStockOnly) {
    this.setState({ inStockOnly });
  }

  render() {
    const { products } = this.props;
    return (
      <div className="container card p-4 shadow-lg">
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onStockChange(e.target.checked);
  }

  render() {
    const { filterText, inStockOnly } = this.props;
    return (
      <section className="mb-4">
        <div className="form-goup">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un produit ..."
            value={filterText}
            onChange={this.handleFilterTextChange}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            checked={inStockOnly}
            className="form-check-input"
            id="stock"
            onChange={this.handleInStockChange}
          />
          <label htmlFor="stock" className="form-check-label">
            Produit en stock seulement
          </label>
        </div>
      </section>
    );
  }
}

function ProductTable({ products, inStockOnly, filterText }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if ((inStockOnly && !product.stocked) || product.name.indexOf(filterText) === -1) {
      return;
    }
    if (product.category !== lastCategory) {
      lastCategory = product.category;
      rows.push(
        <ProductCategoryRow key={lastCategory} category={product.category} />
      );
    }
    rows.push(<ProductRow key={product.name} product={product} />);
  });

  return (
    <div className="card shadow-sm">
    <table className="table m-0">
      <thead>
        <tr>
          <th>Nom :</th>
          <th>Prix :</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
    </div>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span className="text-danger">
      {product.name} <span className="text-muted">(non-disponible)</span>
    </span>
  );
  const price = product.stocked ? (
    product.price
  ) : (
    <span className="text-danger">{product.price}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2" className="table-light text-center fst-italic">
        {category}
      </th>
    </tr>
  );
}

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById("app")
);
