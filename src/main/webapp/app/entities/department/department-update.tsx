import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPosition } from 'app/shared/model/position.model';
import { getEntities as getPositions } from 'app/entities/position/position.reducer';
import { IShiftDemand } from 'app/shared/model/shift-demand.model';
import { getEntities as getShiftDemands } from 'app/entities/shift-demand/shift-demand.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntity, updateEntity, createEntity, reset } from './department.reducer';

export const DepartmentUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const positions = useAppSelector(state => state.position.entities);
  const shiftDemands = useAppSelector(state => state.shiftDemand.entities);
  const departmentEntity = useAppSelector(state => state.department.entity);
  const loading = useAppSelector(state => state.department.loading);
  const updating = useAppSelector(state => state.department.updating);
  const updateSuccess = useAppSelector(state => state.department.updateSuccess);

  const handleClose = () => {
    navigate('/department');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPositions({}));
    dispatch(getShiftDemands({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.key !== undefined && typeof values.key !== 'number') {
      values.key = Number(values.key);
    }
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...departmentEntity,
      ...values,
      position: positions.find(it => it.id.toString() === values.position.toString()),
      shiftDemand: shiftDemands.find(it => it.id.toString() === values.shiftDemand.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...departmentEntity,
          position: departmentEntity?.position?.id,
          shiftDemand: departmentEntity?.shiftDemand?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="rosterApplicationmonoApp.department.home.createOrEditLabel" data-cy="DepartmentCreateUpdateHeading">
            <Translate contentKey="rosterApplicationmonoApp.department.home.createOrEditLabel">Create or edit a Department</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="department-id"
                  label={translate('rosterApplicationmonoApp.department.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('rosterApplicationmonoApp.department.key')}
                id="department-key"
                name="key"
                data-cy="key"
                type="text"
              />
              <ValidatedField
                label={translate('rosterApplicationmonoApp.department.team')}
                id="department-team"
                name="team"
                data-cy="team"
                type="text"
              />
              <ValidatedField
                id="department-position"
                name="position"
                data-cy="position"
                label={translate('rosterApplicationmonoApp.department.position')}
                type="select"
              >
                <option value="" key="0" />
                {positions
                  ? positions.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="department-shiftDemand"
                name="shiftDemand"
                data-cy="shiftDemand"
                label={translate('rosterApplicationmonoApp.department.shiftDemand')}
                type="select"
              >
                <option value="" key="0" />
                {shiftDemands
                  ? shiftDemands.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/department" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DepartmentUpdate;
