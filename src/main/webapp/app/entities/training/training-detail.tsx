import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './training.reducer';

export const TrainingDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const trainingEntity = useAppSelector(state => state.training.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="trainingDetailsHeading">
          <Translate contentKey="rosterApplicationmonoApp.training.detail.title">Training</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="key">
              <Translate contentKey="rosterApplicationmonoApp.training.key">Key</Translate>
            </span>
          </dt>
          <dd>{trainingEntity.key}</dd>
          <dt>
            <span id="id">
              <Translate contentKey="rosterApplicationmonoApp.training.id">Id</Translate>
            </span>
          </dt>
          <dd>{trainingEntity.id}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="rosterApplicationmonoApp.training.description">Description</Translate>
            </span>
          </dt>
          <dd>{trainingEntity.description}</dd>
          <dt>
            <Translate contentKey="rosterApplicationmonoApp.training.positionRequirement">Position Requirement</Translate>
          </dt>
          <dd>{trainingEntity.positionRequirement ? trainingEntity.positionRequirement.id : ''}</dd>
          <dt>
            <Translate contentKey="rosterApplicationmonoApp.training.resourceTraining">Resource Training</Translate>
          </dt>
          <dd>{trainingEntity.resourceTraining ? trainingEntity.resourceTraining.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/training" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/training/${trainingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TrainingDetail;
