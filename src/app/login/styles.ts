"use client";

import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginBox = styled.div`
  background: #fff;
  padding: 3rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #444;
`;

export const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    border-color: #667eea;
    outline: none;
  }

  background-color: #f9f9f9 !important;
`;

export const Button = styled.button`
  padding: 0.75rem;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #5a67d8;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
`;

export const InputStyled = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  width: 100%;
  padding-right: 2.5rem;

  &:focus {
    border-color: #667eea;
    outline: none;
  }
`;

export const TogglePasswordButton = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  font-size: 1.2rem;
  z-index: 1;

  &:hover {
    color: #333;
  }
`;
