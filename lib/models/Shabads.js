/**
 * Objection Model for Shabads.
 * @ignore
 */

const { Model } = require( 'objection' )

const BaseModel = require( './BaseModel' )
const CommonQueryBuilderFactory = require( './CommonQueryBuilder' )
const Lines = require( './Lines' )

class ShabadQueryBuilder extends CommonQueryBuilderFactory( 'lines' ) {
  static getLineIds( shabad ) {
    return Lines
      .query()
      .select( 'id' )
      .where( 'shabad_id', shabad.id )
  }

  withTranslations() {
    return super.appendTranslations( ShabadQueryBuilder.getLineIds )
  }

  withTransliterations() {
    return super.appendTransliterations( ShabadQueryBuilder.getLineIds )
  }
}

class Shabads extends BaseModel {
  static get tableName() {
    return 'shabads'
  }

  static get QueryBuilder() {
    return ShabadQueryBuilder
  }

  static get relationMappings() {
    return {
      writer: {
        relation: Model.HasOneRelation,
        join: {
          from: 'shabads.writer_id',
          to: 'writers.id',
        },
        // eslint-disable-next-line
        modelClass: require( './Writers' ),
      },
      section: {
        relation: Model.HasOneRelation,
        join: {
          from: 'shabads.section_id',
          to: 'sections.id',
        },
        // eslint-disable-next-line
        modelClass: require( './Sections' ),
      },
      subsection: {
        relation: Model.HasOneRelation,
        join: {
          from: 'shabads.subsection_id',
          to: 'subsections.id',
        },
        // eslint-disable-next-line
        modelClass: require( './Subsections' ),
      },
      source: {
        relation: Model.HasOneRelation,
        join: {
          from: 'shabads.source_id',
          to: 'sources.id',
        },
        // eslint-disable-next-line
        modelClass: require( './Sources' ),
      },
      lines: {
        relation: Model.HasManyRelation,
        join: {
          from: 'shabads.id',
          to: 'lines.shabad_id',
        },
        // eslint-disable-next-line
        modelClass: require( './Lines' ),
      },
    }
  }
}

module.exports = Shabads
