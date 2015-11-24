import React from 'react';

import PinterestGridWidgetBase from './PinterestGridWidgetBase';
import Const from '../util/PinConst';

/**
 * Pinterest Board Widget
 *
 * <PinterestBoardWidget board="zackargyle/travel-ideas" />
 *
 * @prop {string} board - the board slug of the board (<username>/<board_name>)
 * @prop {number} width - the width of the board widget
 * @prop {number} height - the height of the board widget
 * @prop {number} columns - the number of columns in the grid
 */
export default class PinterestBoardWidget extends PinterestGridWidgetBase {

    constructor(props) {
        super(props);
        this.data = {
            type: 'board',
            fetchURL: `${Const.URL.BOARD}${props.board}/pins/?base_scheme=http`,
            followURL: `https://www.pinterest.com/${props.board}/follow/?guid=ZEtR27kXo22a`
        };
        this.logCount(Const.COUNT.BOARD);
    }

}

PinterestBoardWidget.propTypes = {
    board: React.PropTypes.string.isRequired
};