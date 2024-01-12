import { fireEvent, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../../../../utils/testStoreUtils';
import ProductCard from '../ProductCard';
import { Rating, ToastNotification } from '../../../../../../../lib';
import { grid } from '../ProductCard.module.scss';

jest.mock('../../../../../../../lib/components/rating/Rating.jsx');

describe('ProductCard component', () => {
  const product = {
    id: 'product id',
    title: 'product title',
    price: 100,
    rating: 0,
    inStock: 100,
    image: {
      overlay: 'image overlay url',
      sizes: { '460X571': 'image size url' },
    },
  };
  const favorite = {
    favoriteItems: [product],
  };

  it('Should display the product title, image, price and link', () => {
    renderWithProviders(
      <BrowserRouter>
        <ProductCard view={'grid'} product={product} />
      </BrowserRouter>
    );
    const productLinks = screen.getAllByRole('link');
    const productImages = screen.getAllByRole('img');
    const productName = screen.getByRole('heading', {
      name: /product title/i,
    });
    const productPrice = screen.getByText('$100.00');

    productLinks.forEach((link) => {
      expect(link).toHaveAttribute(
        'href',
        '/product/product-title/id=product id'
      );
    });
    expect(productImages[0]).toHaveAttribute('src', 'image size url');
    expect(productImages[1]).toHaveAttribute('src', 'image overlay url');
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });

  it('Should have the given view as a class', () => {
    renderWithProviders(
      <BrowserRouter>
        <ProductCard view={'grid'} product={product} />
      </BrowserRouter>
    );
    const productCard = screen.getByRole('article');
    expect(productCard).toHaveClass(grid);
  });

  it('Should disable the add to cart Button if the product stock is empty', () => {
    let outOfStockProduct = { ...product };
    outOfStockProduct.inStock = 0;

    renderWithProviders(
      <BrowserRouter>
        <ProductCard view={'grid'} product={outOfStockProduct} />
      </BrowserRouter>
    );
    const AddToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });
    expect(AddToCartButton).toBeDisabled();
  });

  it('Should display the add to cart tooltip for the cart icon if the product is in stock', () => {
    renderWithProviders(
      <BrowserRouter>
        <ProductCard view={'grid'} product={product} />
      </BrowserRouter>
    );
    const AddToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });
    const cartTooltip = within(AddToCartButton).getByText(/add to cart/i);
    expect(cartTooltip).toBeInTheDocument();
  });

  it('Should display the out of stock tooltip for the cart icon if the product is out of stock', () => {
    let outOfStockProduct = { ...product };
    outOfStockProduct.inStock = 0;

    renderWithProviders(
      <BrowserRouter>
        <ProductCard view={'grid'} product={outOfStockProduct} />
      </BrowserRouter>
    );
    const AddToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });
    const cartTooltip = within(AddToCartButton).getByText(/out of stock/i);
    expect(cartTooltip).toBeInTheDocument();
  });

  it('Should display the add to favorite tooltip for the like icon if the product is not in the favorite', () => {
    renderWithProviders(
      <BrowserRouter>
        <ProductCard view={'grid'} product={product} />
      </BrowserRouter>
    );
    const likedButton = screen.getByRole('button', {
      name: /toggle favorite/i,
    });
    const likedTooltip = within(likedButton).getByText(/add to favorite/i);
    expect(likedTooltip).toBeInTheDocument();
  });

  it('Should display the remove from favorite tooltip for the like icon if the product is in the favorite', () => {
    renderWithProviders(
      <BrowserRouter>
        <ProductCard view={'grid'} product={product} />
      </BrowserRouter>,
      {
        preloadedState: {
          favorite: favorite,
        },
      }
    );
    const likedButton = screen.getByRole('button', {
      name: /toggle favorite/i,
    });
    const likedTooltip = within(likedButton).getByText(/remove from favorite/i);
    expect(likedTooltip).toBeInTheDocument();
  });

  it('Should call the "Rating" component with the given props', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ProductCard view={'grid'} product={product} />
      </BrowserRouter>
    );

    expect(Rating).toHaveBeenNthCalledWith(
      1,
      {
        ratingStars: product.rating,
        ratingDisabled: true,
      },
      {}
    );
  });

  it('Should display the toast message if the toggle favorite button is clicked', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ToastNotification />
        <ProductCard view={'grid'} product={product} />
      </BrowserRouter>
    );
    const likedButton = screen.getByRole('button', {
      name: /toggle favorite/i,
    });
    fireEvent.click(likedButton);
    const toastMessage = await screen.findByText(
      `${product.title} has been added to your favorite`
    );
    expect(toastMessage).toBeInTheDocument();
  });

  it('Should display the toast message if the add to cart button is clicked', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ToastNotification />
        <ProductCard view={'grid'} product={product} />
      </BrowserRouter>
    );
    const cartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(cartButton);
    const toastMessage = await screen.findByText(
      `${product.title} has been added to your cart`
    );
    expect(toastMessage).toBeInTheDocument();
  });
});
