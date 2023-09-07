import sortOrderSmacss from 'stylelint-config-property-sort-order-smacss/generate';

export default {
    "extends": [
        "stylelint-config-standard",
        "stylelint-config-property-sort-order-smacss"
    ],
    "plugins": [
        "stylelint-order"
    ],
    "rules": {
        "indentation": [
            "tab"
        ],
		"order/properties-order": [
			sortOrderSmacss({ emptyLineBefore: 'always' })
		],
        "color-hex-case": "upper"
    }
}