import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITeamPlan } from 'app/shared/model/team-plan.model';
import { getEntities as getTeamPlans } from 'app/entities/team-plan/team-plan.reducer';
import { IShiftDemand } from 'app/shared/model/shift-demand.model';
import { getEntities as getShiftDemands } from 'app/entities/shift-demand/shift-demand.reducer';
import { IResourcePlan } from 'app/shared/model/resource-plan.model';
import { getEntities as getResourcePlans } from 'app/entities/resource-plan/resource-plan.reducer';
import { IShift } from 'app/shared/model/shift.model';
import { getEntity, updateEntity, createEntity, reset } from './shift.reducer';

export const ShiftUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const teamPlans = useAppSelector(state => state.teamPlan.entities);
  const shiftDemands = useAppSelector(state => state.shiftDemand.entities);
  const resourcePlans = useAppSelector(state => state.resourcePlan.entities);
  const shiftEntity = useAppSelector(state => state.shift.entity);
  const loading = useAppSelector(state => state.shift.loading);
  const updating = useAppSelector(state => state.shift.updating);
  const updateSuccess = useAppSelector(state => state.shift.updateSuccess);

  const handleClose = () => {
    navigate('/shift');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTeamPlans({}));
    dispatch(getShiftDemands({}));
    dispatch(getResourcePlans({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.key !== undefined && typeof values.key !== 'number') {
      values.key = Number(values.key);
    }
    values.shiftStart = convertDateTimeToServer(values.shiftStart);
    values.shiftEnd = convertDateTimeToServer(values.shiftEnd);

    const entity = {
      ...shiftEntity,
      ...values,
      teamPlan: teamPlans.find(it => it.id.toString() === values.teamPlan.toString()),
      shiftDemand: shiftDemands.find(it => it.id.toString() === values.shiftDemand.toString()),
      resourcePlan: resourcePlans.find(it => it.id.toString() === values.resourcePlan.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          shiftStart: displayDefaultDateTime(),
          shiftEnd: displayDefaultDateTime(),
        }
      : {
          ...shiftEntity,
          shiftStart: convertDateTimeFromServer(shiftEntity.shiftStart),
          shiftEnd: convertDateTimeFromServer(shiftEntity.shiftEnd),
          teamPlan: shiftEntity?.teamPlan?.id,
          shiftDemand: shiftEntity?.shiftDemand?.id,
          resourcePlan: shiftEntity?.resourcePlan?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="rosterApplicationmonoApp.shift.home.createOrEditLabel" data-cy="ShiftCreateUpdateHeading">
            <Translate contentKey="rosterApplicationmonoApp.shift.home.createOrEditLabel">Create or edit a Shift</Translate>
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
                  id="shift-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('rosterApplicationmonoApp.shift.key')} id="shift-key" name="key" data-cy="key" type="text" />
              <ValidatedField
                label={translate('rosterApplicationmonoApp.shift.shiftStart')}
                id="shift-shiftStart"
                name="shiftStart"
                data-cy="shiftStart"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('rosterApplicationmonoApp.shift.shiftEnd')}
                id="shift-shiftEnd"
                name="shiftEnd"
                data-cy="shiftEnd"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('rosterApplicationmonoApp.shift.type')}
                id="shift-type"
                name="type"
                data-cy="type"
                type="text"
              />
              <ValidatedField
                id="shift-teamPlan"
                name="teamPlan"
                data-cy="teamPlan"
                label={translate('rosterApplicationmonoApp.shift.teamPlan')}
                type="select"
              >
                <option value="" key="0" />
                {teamPlans
                  ? teamPlans.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="shift-shiftDemand"
                name="shiftDemand"
                data-cy="shiftDemand"
                label={translate('rosterApplicationmonoApp.shift.shiftDemand')}
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
              <ValidatedField
                id="shift-resourcePlan"
                name="resourcePlan"
                data-cy="resourcePlan"
                label={translate('rosterApplicationmonoApp.shift.resourcePlan')}
                type="select"
              >
                <option value="" key="0" />
                {resourcePlans
                  ? resourcePlans.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/shift" replace color="info">
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

export default ShiftUpdate;
