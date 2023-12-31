import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './position-requirement.reducer';

export const PositionRequirementDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const positionRequirementEntity = useAppSelector(state => state.positionRequirement.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="positionRequirementDetailsHeading">
          <Translate contentKey="rosterApplicationmonoApp.positionRequirement.detail.title">PositionRequirement</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{positionRequirementEntity.id}</dd>
          <dt>
            <span id="mandatoty">
              <Translate contentKey="rosterApplicationmonoApp.positionRequirement.mandatoty">Mandatoty</Translate>
            </span>
          </dt>
          <dd>{positionRequirementEntity.mandatoty}</dd>
        </dl>
        <Button tag={Link} to="/position-requirement" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/position-requirement/${positionRequirementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PositionRequirementDetail;
