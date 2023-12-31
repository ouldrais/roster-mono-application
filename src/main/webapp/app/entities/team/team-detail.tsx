import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './team.reducer';

export const TeamDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const teamEntity = useAppSelector(state => state.team.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="teamDetailsHeading">
          <Translate contentKey="rosterApplicationmonoApp.team.detail.title">Team</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="key">
              <Translate contentKey="rosterApplicationmonoApp.team.key">Key</Translate>
            </span>
          </dt>
          <dd>{teamEntity.key}</dd>
          <dt>
            <span id="id">
              <Translate contentKey="rosterApplicationmonoApp.team.id">Id</Translate>
            </span>
          </dt>
          <dd>{teamEntity.id}</dd>
          <dt>
            <Translate contentKey="rosterApplicationmonoApp.team.resource">Resource</Translate>
          </dt>
          <dd>{teamEntity.resource ? teamEntity.resource.id : ''}</dd>
          <dt>
            <Translate contentKey="rosterApplicationmonoApp.team.teamPlan">Team Plan</Translate>
          </dt>
          <dd>{teamEntity.teamPlan ? teamEntity.teamPlan.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/team" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/team/${teamEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TeamDetail;
