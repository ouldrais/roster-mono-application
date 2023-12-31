import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './department.reducer';

export const DepartmentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const departmentEntity = useAppSelector(state => state.department.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="departmentDetailsHeading">
          <Translate contentKey="rosterApplicationmonoApp.department.detail.title">Department</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="key">
              <Translate contentKey="rosterApplicationmonoApp.department.key">Key</Translate>
            </span>
          </dt>
          <dd>{departmentEntity.key}</dd>
          <dt>
            <span id="id">
              <Translate contentKey="rosterApplicationmonoApp.department.id">Id</Translate>
            </span>
          </dt>
          <dd>{departmentEntity.id}</dd>
          <dt>
            <span id="team">
              <Translate contentKey="rosterApplicationmonoApp.department.team">Team</Translate>
            </span>
          </dt>
          <dd>{departmentEntity.team}</dd>
          <dt>
            <Translate contentKey="rosterApplicationmonoApp.department.position">Position</Translate>
          </dt>
          <dd>{departmentEntity.position ? departmentEntity.position.id : ''}</dd>
          <dt>
            <Translate contentKey="rosterApplicationmonoApp.department.shiftDemand">Shift Demand</Translate>
          </dt>
          <dd>{departmentEntity.shiftDemand ? departmentEntity.shiftDemand.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/department" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/department/${departmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DepartmentDetail;
