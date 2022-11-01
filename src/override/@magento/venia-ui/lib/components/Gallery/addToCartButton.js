import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { string, number, shape } from 'prop-types';
import { ShoppingBag, XSquare } from 'react-feather';
import { useAddToCartButton } from '@magento/peregrine/lib/talons/Gallery/useAddToCartButton';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Button from '@magento/venia-ui/lib/components/Button';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/Gallery/addToCartButton.module.css';
import Information from '../../../../../../component/Information';

const AddToCartButton = props => {
    const { item, urlSuffix } = props;

    const talonProps = useAddToCartButton({
        item,
        urlSuffix
    });
    const { handleAddToCart, isDisabled, isInStock } = talonProps;
    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, props.classes);

    const AddToCartIcon = (
        <Icon
            classes={{ icon: classes.icon }}
            src={ShoppingBag}
            attrs={{ width: 16 }}
        />
    );

    const OutOfStockIcon = (
        <Icon
            classes={{ icon: classes.icon }}
            src={XSquare}
            attrs={{ width: 16 }}
        />
    );

    const buttonInStock = (
        <>
            <Button
                data-cy="AddToCartButton-buttonInStock"
                aria-label={formatMessage({
                    id: 'addToCartButton.addItemToCartAriaLabel',
                    defaultMessage: 'Add to Cart'
                })}
                className={classes.root}
                disabled={isDisabled}
                onPress={handleAddToCart}
                priority="high"
                type="button"
                style={{ width: '50%' }}
            >
                {AddToCartIcon}
                <span className={classes.text}>
                    <FormattedMessage
                        id="addToCartButton.addItemToCart"
                        defaultMessage="ADD TO CART"
                    />
                </span>
            </Button>
            <Information item={item} />
        </>
    );

    const buttonOutOfStock = (
        <Button
            data-cy="AddtoCartButton-buttonOutOfStock"
            aria-label={formatMessage({
                id: 'addToCartButton.itemOutOfStockAriaLabel',
                defaultMessage: 'Out of Stock'
            })}
            className={classes.root}
            disabled={isDisabled}
            onPress={handleAddToCart}
            priority="high"
            type="button"
        >
            {OutOfStockIcon}
            <span className={classes.text}>
                <FormattedMessage
                    id="addToCartButton.itemOutOfStock"
                    defaultMessage="OUT OF STOCK"
                />
            </span>
        </Button>
    );

    return isInStock ? buttonInStock : buttonOutOfStock;
};

export default AddToCartButton;

AddToCartButton.propTypes = {
    classes: shape({
        root: string,
        root_selected: string
    }),
    item: shape({
        id: number.isRequired,
        uid: string.isRequired,
        name: string.isRequired,
        small_image: shape({
            url: string
        }),
        stock_status: string.isRequired,
        __typename: string.isRequired,
        url_key: string.isRequired,
        url_suffix: string,
        sku: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    value: number,
                    currency: string
                })
            })
        })
    }),
    urlSuffix: string
};
