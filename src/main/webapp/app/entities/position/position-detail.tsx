import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './position.reducer';

export const PositionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const positionEntity = useAppSelector(state => state.position.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="positionDetailsHeading">
          <Translate contentKey="rosterApplicationmonoApp.position.detail.title">Position</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="key">
              <Translate contentKey="rosterApplicationmonoApp.position.key">Key</Translate>
            </span>
          </dt>
          <dd>{positionEntity.key}</dd>
          <dt>
            <span id="id">
              <Translate contentKey="rosterApplicationmonoApp.position.id">Id</Translate>
            </span>
          </dt>
          <dd>{positionEntity.id}</dd>
          <dt>
            <span id="leadership">
              <Translate contentKey="rosterApplicationmonoApp.position.leadership">Leadership</Translate>
            </span>
          </dt>
          <dd>{positionEntity.leadership}</dd>
          <dt>
            <Translate contentKey="rosterApplicationmonoApp.position.positionRequirement">Position Requirement</Translate>
          </dt>
          <dd>{positionEntity.positionRequirement ? positionEntity.positionRequirement.id : ''}</dd>
          <dt>
            <Translate contentKey="rosterApplicationmonoApp.position.resourcePlan">Resource Plan</Translate>
          </dt>
          <dd>{positionEntity.resourcePlan ? positionEntity.resourcePlan.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/position" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/position/${positionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PositionDetail;
