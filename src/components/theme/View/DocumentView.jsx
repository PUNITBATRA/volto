/**
 * Document view component.
 * @module components/theme/View/DocumentView
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Image } from 'semantic-ui-react';
import { map } from 'lodash';

import {
  ViewTitleTile,
  ViewDescriptionTile,
  ViewTextTile,
} from '../../../components';

/**
 * Component to display the document view.
 * @function DocumentView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const DocumentView = ({ content }) =>
  content.tiles ? (
    <div id="page-home">
      <Helmet title={content.title} />
      {map(content.arrangement, tile => {
        let Tile = null;
        switch (content.tiles[tile]['@type']) {
          case 'title':
            Tile = ViewTitleTile;
            break;
          case 'description':
            Tile = ViewDescriptionTile;
            break;
          case 'text':
            Tile = ViewTextTile;
            break;
          default:
            break;
        }
        return Tile !== null ? (
          <Tile key={tile} properties={content} data={content.tiles[tile]} />
        ) : (
          <div>{JSON.stringify(content.tiles[tile]['@type'])}</div>
        );
      })}
    </div>
  ) : (
    <div id="page-home">
      <Helmet title={content.title} />
      <h1 className="documentFirstHeading">{content.title}</h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.image && (
        <Image
          className="document-image"
          src={content.image.scales.thumb.download}
          floated="right"
        />
      )}
      {content.text && (
        <p dangerouslySetInnerHTML={{ __html: content.text.data }} />
      )}
    </div>
  );

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DocumentView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Text of the object
     */
    text: PropTypes.shape({
      /**
       * Data of the text of the object
       */
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default DocumentView;
