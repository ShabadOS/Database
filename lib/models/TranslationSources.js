/**
 * Objection Model for Translation Sources.
 * @ignore
 */

const { Model } = require( 'objection' )

const BaseModel = require( './BaseModel' )

class TranslationSources extends BaseModel {
  static get tableName() {
    return 'translation_sources'
  }

  static get relationMappings() {
    return {
      source: {
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'translation_sources.source_id',
          to: 'sources.id',
        },
        // eslint-disable-next-line
        modelClass: require( './Sources' ),
      },
      translations: {
        relation: Model.HasManyRelation,
        join: {
          from: 'translation_sources.id',
          to: 'translations.translation_source_id',
        },
        // eslint-disable-next-line
        modelClass: require( './Translations' ),
      },
      language: {
        relation: Model.HasOneRelation,
        join: {
          from: 'translation_sources.language_id',
          to: 'languages.id',
        },
        // eslint-disable-next-line
        modelClass: require( './Languages' ),
      },
    }
  }
}

module.exports = TranslationSources
