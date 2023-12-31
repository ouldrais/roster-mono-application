import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './resource-training.reducer';

export const ResourceTrainingDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const resourceTrainingEntity = useAppSelector(state => state.resourceTraining.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="resourceTrainingDetailsHeading">
          <Translate contentKey="rosterApplicationmonoApp.resourceTraining.detail.title">ResourceTraining</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{resourceTrainingEntity.id}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="rosterApplicationmonoApp.resourceTraining.status">Status</Translate>
            </span>
          </dt>
          <dd>{resourceTrainingEntity.status}</dd>
          <dt>
            <span id="level">
              <Translate contentKey="rosterApplicationmonoApp.resourceTraining.level">Level</Translate>
            </span>
          </dt>
          <dd>{resourceTrainingEntity.level}</dd>
          <dt>
            <span id="trainer">
              <Translate contentKey="rosterApplicationmonoApp.resourceTraining.trainer">Trainer</Translate>
            </span>
          </dt>
          <dd>{resourceTrainingEntity.trainer}</dd>
          <dt>
            <span id="activeFrom">
              <Translate contentKey="rosterApplicationmonoApp.resourceTraining.activeFrom">Active From</Translate>
            </span>
          </dt>
          <dd>
            {resourceTrainingEntity.activeFrom ? (
              <TextFormat value={resourceTrainingEntity.activeFrom} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="activeto">
              <Translate contentKey="rosterApplicationmonoApp.resourceTraining.activeto">Activeto</Translate>
            </span>
          </dt>
          <dd>
            {resourceTrainingEntity.activeto ? (
              <TextFormat value={resourceTrainingEntity.activeto} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/resource-training" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/resource-training/${resourceTrainingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ResourceTrainingDetail;
